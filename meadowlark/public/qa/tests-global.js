suite('Global Tests', function(){
    test('page has a valid title', function(){
        AuthenticatorAssert(document.title && document.title.match(/\s/) && document.title.toUpperCase() !== 'TODO');
    });
});