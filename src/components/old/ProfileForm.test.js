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

  it('clicking randomiseIconButton sets state for iconIndex and iconColor', () => {
    mathStub = sinon.stub(Math, 'random').returns(0);
    // To test UI interactions for this component we have to test the functions they trigger at the same time.
    // This is because we cannot stub a function inside ProfileForm to assert that it has been called (in this case the randomiseIcon function).
    // Instead we have to stub the setState function which is called by randomiseIcon to assert that something happens when the button is clicked
    setStateStub = sinon.stub(ProfileForm.prototype, 'setState');
    wrapper = shallow(<ProfileForm />);

    expect(setStateStub.called).to.be.false;
    // This test has to interact with the view
    wrapper.find('#randomiseIconButton').simulate('click');
    expect(setStateStub.calledOnce).to.be.true;
    expect(setStateStub.getCall(0).args[0].iconIndex).to.equal(0);
    // And it also has to understand the logic of functions triggered by interacting with the view
    expect(setStateStub.getCall(0).args[0].iconColor).to.equal('hsl(0,100%,50%)');
  });
});
