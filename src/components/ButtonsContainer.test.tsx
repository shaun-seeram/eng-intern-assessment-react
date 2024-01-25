/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonsContainer from './ButtonsContainer';

const mockFunction = jest.fn(() => {})

describe('ButtonsContainer', () => {

    it('Renders ButtonsContainer component', () => {
        render(<ButtonsContainer timerActive={false} onStart={mockFunction} onPause={mockFunction} onLap={mockFunction} onReset={mockFunction} />);
    }); 

    it('Renders two buttons at a time', () => {
        render(<ButtonsContainer timerActive={false} onStart={mockFunction} onPause={mockFunction} onLap={mockFunction} onReset={mockFunction} />);
        const buttons = screen.queryAllByRole("button")
        expect(buttons.length).toBe(2)
    }); 

    it('Renders correct buttons on timerActive: false', () => {
        render(<ButtonsContainer timerActive={false} onStart={mockFunction} onPause={mockFunction} onLap={mockFunction} onReset={mockFunction} />);
        const buttons = screen.queryAllByRole("button")
        expect(buttons[0].textContent).toBe("Reset")
        expect(buttons[1].textContent).toBe("Start")
    }); 

    it('Renders correct buttons on timerActive: true)', () => {
        render(<ButtonsContainer timerActive={true} onStart={mockFunction} onPause={mockFunction} onLap={mockFunction} onReset={mockFunction} />);
        const buttons = screen.queryAllByRole("button")
        expect(buttons[0].textContent).toBe("Lap")
        expect(buttons[1].textContent).toBe("Pause")
    }); 

});