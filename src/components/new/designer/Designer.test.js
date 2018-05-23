import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import Designer from './Designer';

chai.use(chaiEnzyme());

describe('Designer', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('clicking randomiseIconButton calls function from onRandomiseIconClick prop', () => {
    // The Designer stateless functional component has no understanding of what onRandomseIconClick does
    const spy = sinon.spy();
    // We can mock it as a spy that does nothing and pass it to the component as a prop
    wrapper = shallow(<Designer onRandomiseIconClick={spy} />);

    expect(spy.called).to.be.false;
    // Once interacting with the view
    wrapper.find('#randomiseIconButton').simulate('click');
    // We simply assert that it has been called without worrying about the logic behind it (this is covered in the controller test)
    expect(spy.calledOnce).to.be.true;
  });
});
