/**
* @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import StopWatch from './StopWatch';

describe('StopWatch', () => {

    it('Renders StopWatch component', () => {
        render(<StopWatch time="1:00" />);
    });

    it('Renders 1:00 in the stopwatch', () => {
        render(<StopWatch time="1:00" />);
        const timeEl = screen.getByText("1:00");
        expect(timeEl).toBeTruthy();
    });

});