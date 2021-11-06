# Testing Approach

For the unit test requirement from the previous lab, we "unit tested" the frontend
using Jest and `react-test-renderer`. "Unit tested" here is in quotes because 
after reading more about the different types of testing, it seems that the test we
implemented for the previous lab was closer to component testing, since we were
testing the index page which composes multiple React components.

To our best understanding, unit testing should test the most granular level exposed as a public API, meaning at the React component level in the frontend and the
class/method level in the backend. Moving forward, we will try to do unit testing 
whenever it "makes sense," on a discretionary basis. This means that we will probably
not do unit testing for simple React components that essentially display static
information, but React components with more significant logic will have unit tests.
On the backend, we will try to write unit tests whenever possible, since the input
and output are more explicitly defined on the backend and unit testing allows us to
verify our actual logic that handles the behind-the-scenes work, which is crucial
to our app's functionality.

For the component testing requirement of this lab, we tested the frontend again using
Jest, but this time we used `react-testing-library`. This library takes a more holistic
approach to testing which fits component testing better, since it encourages
interacting with the rendered code in the same ways a user would, e.g. querying by
semantic role instead of by markup tags.

Moving forward, we probably will *not* use component testing extensively. Although
it does provide some useful reassurance that the app functions at a higher level,
testing how numerous components fit together requires mocking a significant amount
of functionality, making the tests harder to write. We do not anticipate that the
number of pages, which would likely be the "components" we test, will grow beyond
a number we can manually test through normal usage of the app. If we were to continue
working on this project, we would likely start using component testing, but given the
limited amount of time we have, the work required for component testing seems to
outweigh the benefits.