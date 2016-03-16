![](./media/image05.png)

**DevJam 2.0 - Instructor's Guide**

**Objectives**

This document will provide instructions, prerequisites for instructors
to execute DevJam 2.0 labs.

**Prerequisites **

-   Sign-up for a trial Apigee Edge account. You can sign-up by filling
    > up a simple form
    > [*here*](https://accounts.apigee.com/accounts/sign_up?int_medium=website&int_campaign=signup&int_source=follow)

-   Configure an org in BaaS. We will use BaaS as a datastore throughout
    > the labs.

-   Provision DevJam attendees into both Edge & BaaS Orgs with Org
    > Administrator role.

**Configure BaaS **

-   Login to BaaS management UI

-   Choose your Org and application. We will use Sandbox application for
    > the DevJam.

-   Create a new collection called “hotels”. We will use this collection
    > our labs.

-   Load entities from the attached “hotels.json” file. You can also
    > create new hotel entities under hotels collection.

**Configure Edge **

-   Login to Edge management UI

-   Choose your Org and environment.

-   Import the OAuth (client-credentials) proxy bundle. If you create a
    > new account, you will get this proxy as one of the
    > default bundles. Deploy the proxy into test environment.

**Configure Postman **

-   We will use Postman as the client in DevJam. Please import Postman
    > environments using the attached DevJam-2.0-environment.json and
    > import DevJam-2.0.json for APIs.

-   After you import, click on “Manage environments” and change the Org
    > and Environment names in your Postman. This should map to your
    > Edge Org and environment (test)

-   Change the “oauth-client-credentials-proxy” property to match the
    > OAuth proxy bundle name deployed in your Edge org.

-   Save the configurations.

**Summary**

Now you are all set. Have fun with the labs!
