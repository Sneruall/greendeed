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
    // Safely handle textContent which might be undefined
    const textContent = el.textContent?.trim() ?? '';

    // Add more contextual keywords to increase the chance of correct identification
    const contextKeywords =
      /(salary|compensation|pay|wage|income|remuneration|annual|rate|hourly|earnings|per annum)/i;

    // Match salary regex and also check for nearby contextual keywords
    if (contextKeywords.test(textContent) && regex.test(textContent)) {
      const salaryMatch = textContent.match(regex);
      if (salaryMatch) {
        const salaryString = salaryMatch[0];
        const currencyMatch = salaryString.match(/£|US\$|€|CA\$|AU\$/);
        const currency = currencyMatch ? currencyMatch[0] : '$';
        const salaryValues = salaryString.match(/\d{1,3}(?:,\d{3})?/g);

        let minSalary, maxSalary;
        if (salaryValues) {
          minSalary = parseFloat(salaryValues[0].replace(/,/g, ''));
          maxSalary = salaryValues[1]
            ? parseFloat(salaryValues[1].replace(/,/g, ''))
            : null;
        } else {
          minSalary = 0;
          maxSalary = 0;
        }

        salaryData = {
          currency: currency,
          period: 'Annual',
          min: {
            float: minSalary,
            formatted: salaryValues ? salaryValues[0] : '',
            value: minSalary,
          },
          max: maxSalary
            ? {
                float: maxSalary,
                formatted: salaryValues ? salaryValues[1] : '',
                value: maxSalary,
              }
            : null,
          string: salaryString,
        };
      }
    }
  });

  return salaryData;
};
