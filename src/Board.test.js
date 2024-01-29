import { screen, render } from "@testing-library/react";
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
})