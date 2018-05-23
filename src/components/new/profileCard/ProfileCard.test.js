import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import ProfileCard from './ProfileCard';

chai.use(chaiEnzyme());

describe('ProfileCard', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe('profileCardComplement', () => {
    it('displays "Missing name..." if no name is given', () => {
      wrapper = shallow(<ProfileCard icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardComplement').text()).to.equal('Missing name...');
    });

    it('displays a complement if a name is given', () => {
      wrapper = shallow(<ProfileCard name="Rowan" icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardComplement').text()).to.equal('Has a very cool name!');
    });
  });

  describe('profileCardName', () => {
    it('displays empty string is no name is given', () => {
      wrapper = shallow(<ProfileCard icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardName').text()).to.equal('');
    });

    it('displays name if given', () => {
      wrapper = shallow(<ProfileCard name="Rowan" icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardName').text()).to.equal('Rowan');
    });
  });

  describe('profileCardIcon', () => {
    it('sets given icon prop', () => {
      wrapper = shallow(<ProfileCard name="Rowan" icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardIcon').props().icon).to.equal('face');
    });

    it('sets style prop to have a light grey background if iconColor is not given', () => {
      wrapper = shallow(<ProfileCard name="Rowan" icon="face" />);

      expect(wrapper.find('#profileCardIcon').props().style).to.deep.equal({ backgroundColor: 'lightgrey' });
    });

    it('sets style prop to have given color as background iconColor if given', () => {
      wrapper = shallow(<ProfileCard name="Rowan" icon="face" iconColor="red" />);

      expect(wrapper.find('#profileCardIcon').props().style).to.deep.equal({ backgroundColor: 'red' });
    });
  });
});
