# Redfin UXE Gallery Challenge

## Front End Development
- Development Process: use technologies and libraries that assist with Development
  - Module bundler: Webpack or Parcel
  - Frameworks like React or Angular
  - Sass for Styling
  - Component Library vs in-house built
  - Best practices followed
- Analytics
  - Tools like Google Analytics, Heap Analytics
  - What kind of analytics do we expect to gain from this application
- Offline Access
- Cross Device functionality
  - Device support:
- Accessibility
  - ARIA
  - Responsive Design
  - Internationlization
- UX Design
  - Responsive design


## Service Layer
- APIs
  - if we are using 3rd party APIs, we should serve them via our application server instead of client application
  - GET API: `/images`
    - fetches a set of images - default count (30) can be set through our application server
  - SIZE-based GET API: `/images?size={thumb|regular|raw}`
  - PAGINATION GET API: `/images?start={start}&end={end}&count={count}`
    - also possible through a request payload and `POST` request type
- Database: We need to maintain our own database of users who can access our application
  - SQL
  - NoSQL


## Scalability and Infrastructure
- Cost
  - any application development, cost can play a major role in making decisions
- Security
  - are we prone to DOS attacks?
  - PII data?
- CDN
  - Since we are serving so many images, CDN can offer faster load times
- Deployment
  - Are we building a React-native app? A server-side rendered application or a static application
- Performance
  - turnaround time
- End to End Testing
  - Build testing automation framework using Selenium and/or UI framworks like Geb

## Implementation and Improvements

### Goal achieved
- Our application offers responsive design. Thanks to css-grids and some `flex`.
Switching between different device views via Developer Tools, we can view our application's responsive behavior. Even in full-screen mode.
- Added a loader component for initial loading UX

### Current Challenge Implementation
1. initialize our application and append DOM elements
2. Fetch images and store them in a `store` variable
3. css-grid Implementation (don't be tempted to use flex)
4. compare against the given examples to display images
5. Responsiveness - try not to give any strict dimensions
6. Modal component implementation
7. Centering of image inside the modal using `flex` properties

### For REDFIN purposes
1. Collect data on who are the end-users of this application
2. Is an Authentication layer required?
  a. If not all, do certain APIs need authentication
3. Role based access?
4. End to end testing on all compatible devices
5. Need to implement all of the above topics

Since this challenge was meant to be solved in shortest time, it has collected quite a bit of tech-debt. Listing the improvements needed -

### Tech-Debt (or if more time)
#### HTML
- Semantic HTML improved usage
#### JS
- Followed a promise and async pattern but nested function calls structure can be cleaner
- add error handling
- Fix Global namespace pollution
- separation of concerns (service layer, component layer)
- naming convention improvement and/or BEM model
- Use Webpack or Parcel for faster development
- Unit testing
- accessibility improvements - ARIA
- use of imports
- minification
- Document generation
#### CSS
- Managing stylesheets through CSS pre-processors, solution - sass or less
- Flex usage over CSS grid
- media queries
#### API calls
- build an application server for fetching images
- Pagination
#### UX
- add spinner for UX (especially when loading images in full screen)
  - Input from a Design team member on a nicer loading behaviors, for example, loading behavior on box.com
- Correct font library

<i>Side note- Fun exercise, however it was definitely more than 2-3 hours</i>