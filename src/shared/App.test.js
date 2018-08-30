import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { shallow, mount } from 'enzyme'


describe('Main Shared App Component (Shallow Render Only)', ()=>{
	it('+++Varify Component Rendering Without Crashing', ()=>{
		const wrapper = shallow(<App />)
		expect(wrapper.length).toEqual(1)
		
	})
})