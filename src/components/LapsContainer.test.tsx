/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import LapsContainer from './LapsContainer';

function formatTime(time: number) {
    const ms = Math.floor((time % 1000) / 10).toLocaleString('en-US', {minimumIntegerDigits: 2});
    const s = Math.floor((time / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
    const m = Math.floor((time / 1000 / 60) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
    const h = Math.floor((time / 1000 / 60 / 60) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2});

    return `${h}:${m}:${s}.${ms}`;
}

describe('LapsContainer', () => {

    it('Renders LapsContainer component', () => {
        render(<LapsContainer laps={[1000]} formatTime={formatTime} />);
    });

    it('Renders a lap with the correct time: 1 Minute', () => {
        render(<LapsContainer laps={[60000]} formatTime={formatTime} />);
        const timeEl = screen.getByText(/00:01:00.00/i)
        expect(timeEl).toBeTruthy()
    });

    it('Renders a lap with the correct time: 1 Minute, 30 Seconds', () => {
        render(<LapsContainer laps={[90000]} formatTime={formatTime} />);
        const timeEl = screen.getByText(/00:01:30.00/i)
        expect(timeEl).toBeTruthy()
    });

    it('Does not render a lap with the correct time: 1 Minute, 31 Seconds', () => {
        render(<LapsContainer laps={[90000]} formatTime={formatTime} />);
        const timeEl = screen.getByText(/00:01:30.00/i)
        expect(timeEl).toBeTruthy()
    });

    it('Renders three laps', () => {
        render(<LapsContainer laps={[1000, 2000, 3000]} formatTime={formatTime} />);
        const lapArray = screen.queryAllByText(/Lap/i)
        expect(lapArray.length).toBe(3)
    });

    it('Does not render three laps', () => {
        render(<LapsContainer laps={[1000, 2000, 3000, 4000]} formatTime={formatTime} />);
        const lapArray = screen.queryAllByText(/Lap/i)
        expect(lapArray.length).not.toBe(3)
    });

});