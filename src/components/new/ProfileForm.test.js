import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import ProfileForm from './ProfileForm';

chai.use(chaiEnzyme());

describe('ProfileForm', () => {
  let wrapper;
  let setStateStub;
  let mathStub;

  afterEach(() => {
    wrapper.unmount();
    setStateStub.restore();
    mathStub.restore();
  });

  // Seeing as this is a container component, instead of testing the component by interacting with the UI, we unit test the functions inside the component directly
  it('randomiseIcon sets state for iconIndex and iconColor', () => {
    mathStub = sinon.stub(Math, 'random').returns(0);
    setStateStub = sinon.stub(ProfileForm.prototype, 'setState');
    wrapper = shallow(<ProfileForm />);

    expect(setStateStub.called).to.be.false;
    // This test no longer interacts with the view, it now directly calls the function being tested
    wrapper.instance().randomiseIcon();
    expect(setStateStub.calledOnce).to.be.true;
    expect(setStateStub.getCall(0).args[0].iconIndex).to.equal(0);
    expect(setStateStub.getCall(0).args[0].iconColor).to.equal('hsl(0,100%,50%)');
  });
});
