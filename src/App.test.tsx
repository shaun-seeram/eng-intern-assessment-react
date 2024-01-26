/**
* @jest-environment jsdom
*/

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

const setupFunction = () => {
    jest.useFakeTimers()
    render(<App />);
    const timeEl = screen.getByText("00:00:00.00")
    const startButton = screen.getByText("Start")
    fireEvent.click(startButton)
    act(() => {
        jest.advanceTimersByTime(1000)
    })
    return timeEl
}

afterEach(() => {
    jest.useRealTimers();
})

describe('App', () => {

    it('Renders App component', () => {
        render(<App />);
    });

    it('Time initially should be 00:00:00.00', () => {
        render(<App />);
        const timeEl = screen.getByText("00:00:00.00")
        expect(timeEl).toBeTruthy()
    });

    it('Time starts on "Start" press', async () => {
        const timeEl = setupFunction()
        expect(timeEl.textContent).toBe("00:00:01.00")
    });

    it('Time pauses on "Pause" press', () => {
        const timeEl = setupFunction()
        const pauseButton = screen.getByText("Pause")
        fireEvent.click(pauseButton)
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(timeEl.textContent).not.toBe("00:00:02.00")
    });

    it('Laps & timer resets on "Reset" press', () => {
        const timeEl = setupFunction()
        const lapButton = screen.getByText("Lap")
        fireEvent.click(lapButton)
        const recordedLap = screen.getAllByRole("listitem")
        expect(recordedLap.length).toBe(1)
        const pauseButton = screen.getByText("Pause")
        fireEvent.click(pauseButton)
        const resetButton = screen.getByText("Reset")
        fireEvent.click(resetButton)
        const resetRecordedLap = screen.queryAllByRole("listitem")
        expect(resetRecordedLap.length).toBe(0)
        expect(timeEl.textContent).toBe("00:00:00.00")
    });

    it('Time recorded on "Lap" press', () => {
        const timeEl = setupFunction()
        const lapButton = screen.getByText("Lap")
        fireEvent.click(lapButton)
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(timeEl.textContent).toBe("00:00:02.00")
        fireEvent.click(lapButton)
        const recordedLaps = screen.getAllByRole("listitem")
        expect(recordedLaps.length).toBe(2)
    });
});