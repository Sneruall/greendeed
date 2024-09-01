// utils.ts

export const cleanHTML = (html: string): string => {
  return html
    .replace(/\n/g, '')
    .replace(/ dir="ltr"/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s\s+/g, ' ')
    .trim();
};

export const getTextFromLabel = (
  doc: Document,
  label: string
): string | null => {
  return (
    doc
      .evaluate(
        `//dt[text()="${label}"]/following-sibling::dd`,
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      )
      .singleNodeValue?.textContent?.trim() || null
  );
};

export const extractSalaryData = (doc: Document, regex: RegExp): any | null => {
  const salaryElements = doc.querySelectorAll(
    'p, div, span, .job__tags, .job__header'
  );
  let salaryData = null;

  salaryElements.forEach((el) => {
    const textContent = el.textContent?.trim() ?? '';

    // Updated context keywords to include more specific phrases
    const contextKeywords =
      /(salary|compensation|pay|wage|income|remuneration|annual|rate|hourly|earnings|per annum)/i;

    // Combine regex and contextual checks for more robust extraction
    if (contextKeywords.test(textContent) && regex.test(textContent)) {
      const salaryMatch = textContent.match(regex);
      if (salaryMatch) {
        const salaryString = salaryMatch[0];
        const currencyMatch = salaryString.match(/£|US\$|€|CA\$|AU\$/);
        const currency = currencyMatch ? currencyMatch[0] : '$'; // Fallback currency

        const salaryValues = salaryString.match(/\d{1,3}(?:,\d{3})?/g);
        let minSalary, maxSalary;

        if (salaryValues) {
          minSalary = parseFloat(salaryValues[0].replace(/,/g, ''));
          maxSalary = salaryValues[1]
            ? parseFloat(salaryValues[1].replace(/,/g, ''))
            : null;

          cy.log('Extracted Text Content:', textContent);
          cy.log('Salary Match:', salaryMatch);

          // Validation step: Reject obviously incorrect salaries
          if (minSalary < 1000) return null; // Assuming salaries under 1000 are not valid

          salaryData = {
            currency: currency,
            period: 'Annual',
            min: {
              float: minSalary,
              formatted: salaryValues[0],
              value: minSalary,
            },
            max: maxSalary
              ? {
                  float: maxSalary,
                  formatted: salaryValues[1],
                  value: maxSalary,
                }
              : null,
            string: salaryString,
          };
        }
      }
    }
  });

  return salaryData;
};
