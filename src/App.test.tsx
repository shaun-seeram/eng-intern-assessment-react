/**
* @jest-environment jsdom
*/

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

const mockFunction = jest.fn(() => {})

describe('App', () => {

    it('Renders App component', () => {
        render(<App />);
    });

    it('Time initially should be 00:00:00.00', () => {
        render(<App />);
        const timeEl = screen.getByText(/00:00:00.00/i)
        expect(timeEl).toBeTruthy()
    });

    it('Time starts on "Start" press', async () => {
        render(<App />);
        const timeEl = screen.getByText(/00:00:00.00/i)
        const startButton = screen.getByText("Start")
        fireEvent.click(startButton)
        await waitFor(() => {
            expect(timeEl.textContent).not.toBe("00:00:00.00")
        })
    });

    it('Time pauses on "Pause" press', async () => {
        render(<App />);
        const timeEl = screen.getByText(/00:00:00.00/i)
        const startButton = screen.getByText("Start")
        fireEvent.click(startButton)
        await waitFor(() => {
            expect(timeEl.textContent).not.toBe("00:00:00.00")
        })
        const pauseButton = screen.getByText("Pause")
        fireEvent.click(pauseButton)
        expect(timeEl.textContent).toBe("00:00:00.01")
    });

    it('Time resets on "Reset" press', async () => {
        render(<App />);
        const timeEl = screen.getByText(/00:00:00.00/i)
        const startButton = screen.getByText("Start")
        fireEvent.click(startButton)
        await waitFor(() => {
            expect(timeEl.textContent).not.toBe("00:00:00.00")
        })
        const pauseButton = screen.getByText("Pause")
        fireEvent.click(pauseButton)
        expect(timeEl.textContent).toBe("00:00:00.01")
        const resetButton = screen.getByText("Reset")
        fireEvent.click(resetButton)
        expect(timeEl.textContent).toBe("00:00:00.00")
    });

    it('Time recorded on "Lap" press', async () => {
        render(<App />);
        const timeEl = screen.getByText(/00:00:00.00/i)
        const startButton = screen.getByText("Start")
        fireEvent.click(startButton)
        await waitFor(() => {
            expect(timeEl.textContent).not.toBe("00:00:00.00")
        })
        const lapButton = screen.getByText("Lap")
        fireEvent.click(lapButton)
        const recordedLap = screen.getByRole("listitem")
        expect(recordedLap.textContent).toBe("Lap 1 00:00:00.01")
    });
});