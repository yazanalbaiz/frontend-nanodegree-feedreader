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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has all URLs defined', () => {
            let flag;

            for(feed of allFeeds){
                if(feed.url === ''){
                    flag = false;
                    break;
                }
                flag = true;
            }

            expect(flag).toBeDefined();
            expect(flag).toBe(true);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has all names defined', () => {
            let flag;

            for(feed of allFeeds) {
                if(feed.name === '') {
                    flag = false;
                    break;
                }
                flag = true;
            }

            expect(flag).toBeDefined();
            expect(flag).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
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
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
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

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        //Ripped the syntax off the testing course
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            })
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has at least one entry', (done) => {
            const feedContainer = document.querySelector('.feed');
            const entry0 = document.querySelector('.entry-link') || null;

            expect(entry0).not.toBe(null);
            done();
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
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
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes content when new feed is loaded', () => {
            expect(isLoaded).toBe(true);
            done();
        });
    });
    
}());
