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

export const getTextFromSelectors = (
  doc: Document,
  selectors: string[]
): string | null => {
  for (const selector of selectors) {
    const element = doc.querySelector(selector);
    if (element && element.textContent) {
      return element.textContent.trim();
    }
  }
  return null; // Return null if no matching element is found
};

export function getTextFromMultipleSelectors(
  doc: Document,
  selectors: string[]
) {
  let combinedText = '';

  selectors.forEach((selector) => {
    const elements = doc.querySelectorAll(selector);
    elements.forEach((el) => {
      const text = el?.textContent?.trim();
      if (text && !combinedText.includes(text)) {
        combinedText += (combinedText ? ' ' : '') + text;
      }
    });
  });

  return combinedText;
}

export const getHTMLFromSelectors = (doc: Document, selectors: string[]) => {
  for (const selector of selectors) {
    const element = doc.querySelector(selector);
    if (element) {
      return element.innerHTML.trim();
    }
  }
  return null;
};

export const getJobTypeFromSelectors = (doc: Document, selectors: string[]) => {
  for (const selector of selectors) {
    const elements = Array.from(doc.querySelectorAll(selector));
    const jobType = elements
      .map((el) => el.textContent?.trim() || '') // Use optional chaining and provide a default empty string if null
      .find((text) =>
        /full-time|part-time|contract|freelance|internship|traineeship|volunteer/i.test(
          text
        )
      );
    if (jobType) return jobType;
  }
  return null;
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
      /(salary|compensation|pay|wage|income|remuneration|annual|rate|hourly|earnings|per annum|per hour)/i;

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
          cy.log('Salary String:', salaryString);
          cy.log('Salary Min:', minSalary);

          // Determine the period based on keywords
          let period = 'Annual'; // Default to Annual
          if (/per hour/i.test(textContent)) {
            period = 'Hourly';
          } else if (/per month/i.test(textContent)) {
            period = 'Monthly';
          } else if (/per annum|annual/i.test(textContent)) {
            period = 'Annual';
          }

          // Validation step: Reject obviously incorrect salaries
          const isInvalidSalary =
            (period === 'Annual' && minSalary < 1000) || // Invalid annual salary less than 1000
            (period === 'Monthly' && minSalary < 100) || // Invalid monthly salary less than 100
            (period === 'Hourly' && minSalary < 3); // Invalid hourly salary less than 3

          if (isInvalidSalary) return null;

          salaryData = {
            currency: currency,
            period: period, // Dynamically set the period based on context
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
