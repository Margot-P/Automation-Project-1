describe('Delete issue', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
    it('Deleting an issue', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Are you sure you want to delete this issue?');
        cy.get('[data-testid="modal:confirm"]').find('button').first().click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '3')
                .first()
                .find('p')
                .contains('Click');
            cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
            cy.get('[data-testid="icon:task"]').should('be.visible');
            cy.get('[data-testid="list-issue"]').find('p').contains('Task').should('not.exist');
        });
    });
    it('Cancelling deletion', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('[data-testid="modal:confirm"]').should('be.visible').should('contain', 'Are you sure you want to delete this issue?');
        cy.get('[data-testid="modal:confirm"]').find('button').contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '4')
                .first()
                .find('p')
                .contains('Task');
            cy.get('[data-testid="icon:task"]').should('be.visible');
            cy.get('[data-testid="icon:arrow-up"]').should('be.visible');
        });
    });
});   
