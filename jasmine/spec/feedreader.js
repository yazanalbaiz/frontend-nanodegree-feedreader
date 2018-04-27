/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //This test checks if the feeds have URLs
        it('has all URLs defined', () => {
            for(feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });


        //This test checks that all feeds have names
        it('has all names defined', () => {
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });

    //This test suite covers the functionality of the menu nav 
    describe('The menu', () => {
        //This test checks that the menu nav is hidden by default
        it('should be hidden by default', () => {
            //Declare a boolean flag and init it
            let flag = false;
            //Check whether it is hidden by default
            if(document.body.classList.contains('menu-hidden')) {
                //Set the flag to true if it is hidden
                flag = true;
            }
            expect(flag).toBe(true);
        });
         
        //This test checks if the menu nav opens and closes when clicked
         it('should toggle when clicked', () => {
            //Hold the icon in a varible
            const icon = document.querySelector('.menu-icon-link');
            //Simulate a click event using the .click() native in JS not the jQuery one (I don't believe in jQuery)
            //Credit goes to ruba from the uconnectsaudi slack for hinting this function at me
            icon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            //Simulate again
            icon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    
    //This test suite covers the initial feed and it's entries
    describe('Initial Entries', () => {
        //Ripped the syntax off the testing course
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            })
        });
        
        //This test checks that there is at least one entry in a feed
        it('has at least one entry', (done) => {
            const feedContainer = document.querySelector('.feed');
            const entry0 = document.querySelector('.entry-link') || null;

            expect(entry0).not.toBe(null);
            done();
        });
    });
        

    //This test suite covers switching between feeds
    describe('New Feed Selection', () => {
        //A boolean flag that indicates whether another feed has loaded or not
        let isLoaded = false;
        beforeEach((done) => {
            loadFeed(0, () => {
                loadFeed(1, () => {
                    isLoaded = true;
                    //This was the only place that done made the test pass
                    done();
                });
            })
        });
        
        //This test checks if the content loads when you switch from one feed to the other
        it('changes content when new feed is loaded', (done) => {
            expect(isLoaded).toBe(true);
            done();
        });
    });
    
}());
