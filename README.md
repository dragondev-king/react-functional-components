# react-functional-components-example
Example project showing how a large component with both logic and design can be divided into reusable controller components and stateless functional presentational components.
It is not intended to be a complete project. It is instead intended to highlight some core React development concepts for learning purposes.

## Running locally

1. pull master branch from https://github.com/dragondev-king/react-functional-components

2. in project folder run `yarn install` to install project dependencies

3. `yarn run start` starts a localhost server for development purposes at localhost:3000

## Running tests
`yarn run test` runs all tests

## Dividing into container and presentational components

While it is entirely possible to create a React app in a single component, the general goal is to reduce components to a single purpose. By doing so they will be separating concerns, making them more reusable, and easier to test. This example project will be highlighting how a large component with both business and presentational logic can be divided into container components (whose job is to handle data and provide it to other components) and presentational components (stateless functional components which are only concerned with how this is displayed).

To start lets look at the first part of the old ProfileForm component which has been written to contain the entire app as a single component.
```javascript
class ProfileForm extends React.Component {
  state = {
    name: '',
    iconList: ['help'],
    iconIndex: 0,
    iconColor: 'grey',
  }
  ...
 ```
 As we can see it is a class which extends a React component and it holds a few state variables with default values.
 
 It has a React lifecycle function which makes an api call then changes the state based on the result.
```javascript
  componentDidMount() {
    Api.getIconList().then((iconList) => {
      this.setState({ iconList });
    });
  }
```
And other functions which have state changing logic as well as rendering logic.
```javascript
  randomiseIcon = () => {
    this.setState({
      iconIndex: Math.floor(Math.random() * this.state.iconList.length),
      iconColor: this.getRandomColor(),
    });
  }

  renderCompliment = () => {
    let compliment = 'Missing name...';
    if (this.state.name) {
      compliment = 'Has a very cool name!';
    }
    return <p id="profileCardCompliment" className={styles.compliment}>{compliment}</p>;
  };
```
Finally there is the render logic which has all the elements/components for the whole app.
```javascript
  render() {
    return (
      <div className={styles.profileFormContainer}>
        <div className={styles.designerContainer}>
          <Input
            id="designerInput"
            autoFocus
            type="text"
            label="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            innerRef={this.setInputRef}
            onBlur={this.onInputBlur}
          />
          <Button
            id="randomiseIconButton"
            icon="gesture"
            raised
            label="Randomise Icon"
            onClick={this.randomiseIcon}
          />
        </div>
        <div className={styles.profileCardContainer}>
          <div className={styles.nameContainer}>
            <Avatar
              id="profileCardIcon"
              style={{ backgroundColor: this.state.iconColor }}
              icon={this.state.iconList[this.state.iconIndex]}
            />
            <div className={styles.nameSubContainer}>
              <p id="profileCardName" className={styles.name}>{this.state.name}</p>
              {this.renderCompliment()}
            </div>
          </div>
        </div>
      </div>
    );
  }
```
Which should look something like this:

![Profile Form Screenshot](screenshots/ProfileFormScreenshot.png?raw=true "Profile Form Screenshot")

While this single component has everything working as intended, it isn't reusable. For instance we couldn't realistically pick this component up and use it in another project with a different purpose. It is too heavily tied to the context of this app.
However it is possible that the profile card is something that could be reused across different apps. To do this we would need to refactor it out to it's own component. Which is exactly what we are going to do!

To start we create a new component `ProfileCard.js` and just with a normal component we import `React` However instead of importing `component` from React and defining a class like so:
```javascript
import React, { component } from 'react';

class ProfileCard extends component {
  ...
}
```
We can instead create ProfileCard as a stateless functional component. Like this:
```javascript
import React from 'react';

const ProfileCard = () => {
  ...
}
```
While these look quite similar there are some big differences. One is a React component which is capable of maintaining state and accessing React lifecycle functions. And the other is simply a function which takes in an input (in this case props) and then returns some element(s). This ProfileCard component is only interested in inputs for its name, its icon and the colour of the icon. Here we use object destructuring on the prop object to get the props:
```javascript
const ProfileCard = ({ name, icon, iconColor }) => {
  ...
}
```
Now instead of accessing the props as we usually would in a regular React component like `this.props.name` we instead have a variable `name` that we can access directly.

After moving over the rendering logic/styles and refactoring the state object to props, we now have a working stateless functional component:
```javascript
const ProfileCard = ({ name, icon, iconColor }) => {
  const renderCompliment = () => {
    let compliment = 'Missing name...';
    if (name) {
      compliment = 'Has a very cool name!';
    }
    return <p id="profileCardCompliment" className={styles.compliment}>{compliment}</p>;
  };

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.nameContainer}>
        <Avatar id="profileCardIcon" style={{ backgroundColor: iconColor }} icon={icon} />
        <div className={styles.nameSubContainer}>
          <p id="profileCardName" className={styles.name}>{name}</p>
          {renderCompliment()}
        </div>
      </div>
    </div>
  );
};
```
As we can see there is a function `renderCompliment` within this stateless functional component. It's important to note that it is totally fine to include functions like these as long as they are only used for presentational logic. However with that being said it would arguably be more appropriate to have the `renderCompliment` function refactored into its own stateless functional component. But just for this example we will leave it as is.

Now just before we start using this function elsewhere we should define the prop contract with any other component that wants to use this one. To do so we `import PropTypes from 'prop-types'` and then define the propTypes for this component:
```javascript
ProfileCard.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
};
```
These propTypes behave exactly as they would for a normal component; they define what we expect the input prop types are and whether or not they are required.

In this case all 3 of our props are `strings` and only the `icon` prop is required.

Seeing as `name` and `iconColor` are not required we need to define what their defaults are in the event that they are not provided.
```javascript
ProfileCard.defaultProps = {
  name: '',
  iconColor: 'grey',
};
```
Now all we have to do is export the new component
```javascript
export default ProfileCard;
```
And now it can be imported and used wherever we want. Hooray!

With that being said we can go back to the `ProfileForm.js` and replace the inline ProfileCard in the render function with our new stateless functional component like so:
```javascript
import ProfileCard from '../new/profileCard/ProfileCard';
...

class ProfileForm extends React.Component {
  ...
  
  render() {
    return (
      <div className={styles.profileFormContainer}>
        ...
        <ProfileCard
          name={this.state.name}
          icon={this.state.iconList[this.state.iconIndex]}
          iconColor={this.state.iconColor}
        />
      </div>
    );
  }
}
```
Now `ProfileForm` is acting as the container and data provider for the `ProfileCard`. `ProfileForm` maintains and manipulates the data required by `ProfileCard` so it doesn't have to worry about it itself.

## Testing a stateless functional components
One massive benefit of using stateless functional components is that they are just that: **functions!**
As such we don't have to be concerned with maintaining state. All we are interested in is *'Given a set of inputs (props) do we get the correct output'?'*
For example to test how `ProfileCard` renders the compliment given the name prop is provided and not provided, we would have something like:
```javascript
describe('profileCardCompliment', () => {
  it('displays "Missing name..." if no name is given', () => {
    wrapper = shallow(<ProfileCard />);

    expect(wrapper.find('#profileCardCompliment').text()).to.equal('Missing name...');
  });

  it('displays a compliment if a name is given', () => {
    wrapper = shallow(<ProfileCard name="Rowan" />);

    expect(wrapper.find('#profileCardCompliment').text()).to.equal('Has a very cool name!');
  });
});
```

### Helpful links
* https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

### Author
[Kenji Nakamura](https://github.com/dragondev-king)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
