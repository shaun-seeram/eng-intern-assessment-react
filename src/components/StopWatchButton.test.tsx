/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatchButton from './StopWatchButton';

const mockFunction = jest.fn(() => {})

describe('StopWatchButton', () => {

    it('Renders StopWatchButton component', () => {
        render(<StopWatchButton onClick={mockFunction}>Test</StopWatchButton>);
    });

    it('Renders button with text "Test"', () => {
        render(<StopWatchButton onClick={mockFunction}>Test</StopWatchButton>);
        const textEl = screen.getByRole("button")
        expect(textEl.textContent).toBe("Test")
    });

});