import { screen, render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe('Should create the Tic Tac Toe Board Game', () => {
    it('should render the heading', () => {
        render(<Board />);
        const heading = screen.getByRole('heading', {level: 1})
        expect(heading).toHaveTextContent('Tic Tac Toe');
    })

    it('Should render 9 squares', () => {
        render(<Board/>);
        const squares = screen.getAllByTestId('column').length;
        expect(squares).toBe(9);
    })

    it('Should have squares button to be in disabled on first render', () => {
        render(<Board/>);
        const squares = screen.getAllByTestId('column');
        squares.forEach(square => {
            expect(square).toHaveAttribute('disabled');
        })
    })

    it('Should have squares button text to be empty', () => {
        render(<Board/>);
        const squares = screen.getAllByTestId('column');
        squares.forEach(square => {
            expect(square).toHaveTextContent('');
        })
    })

    it('Should have button with Start Text', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        expect(btnStart).toBeInTheDocument();
    })

    it('Should have button with Reset Text', () => {
        render(<Board/>);
        const btnReset = screen.getByTestId('btn-reset');
        expect(btnReset).toBeInTheDocument();
    })

    it('Should have squares button to be enabled on Start Button Click', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const squares = screen.getAllByTestId('column');
        squares.forEach(square => {
            expect(square).not.toHaveAttribute('disabled');
        })
    })

    it('Should  have the message "Player ONE turn now..." on Start Button Click', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        const msg = screen.getByRole('heading', {level: 2});
        fireEvent.click(btnStart);
        expect(msg).toHaveTextContent('Player ONE turn now...');
    })

    it('Should fill the Square with "X" on First Click', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);
        const msg = screen.getByRole('heading', {level: 2});
        expect(columns[0]).toHaveTextContent('X');
        expect(columns[0]).toHaveAttribute('disabled');
        expect(msg).toHaveTextContent('Player TWO turn now...');
    })

    it('Should fill the Square with "O" on Second Click', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);
        fireEvent.click(columns[1]);
        const msg = screen.getByRole('heading', {level: 2});
        expect(columns[1]).toHaveTextContent('O');
        expect(columns[1]).toHaveAttribute('disabled');
        expect(msg).toHaveTextContent('Player ONE turn now...');
    })

})