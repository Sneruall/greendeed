describe('Scrape job positions from Wagestream Careers page', () => {
  it('Retrieves job position links', () => {
    // Visit the Wagestream careers page
    cy.visit('https://wagestream.com/en/careers');

    // Wait for the page to load fully
    cy.wait(5000); // Adjust this as necessary

    // Find all job position links within the job listing section
    cy.get('a[href*="careers.wagestream.com/jobs/"]').each(($el) => {
      // Get the href attribute from each job link
      const jobLink = $el.attr('href');

      // Log the link to the Cypress console
      cy.log(jobLink);

      // Write each link to a file, appending to the file for each new link
      cy.writeFile('job_links.txt', jobLink + '\n', { flag: 'a+' });
    });
  });
});
