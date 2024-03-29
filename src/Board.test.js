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

    it("Should announce winner as player ONE [0,1,2]  and freeze the board", () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);//player ONE
        fireEvent.click(columns[8]);//player TWO
        fireEvent.click(columns[1]);//player ONE
        fireEvent.click(columns[7]);//player TWO
        fireEvent.click(columns[2]);//player ONE
        const msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('Player ONE is the !!!Winner!!!');
    })

    it("Should announce winner as player TWO [2,4,6]  and freeze the board", () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);//player ONE
        fireEvent.click(columns[4]);//player TWO
        fireEvent.click(columns[1]);//player ONE
        fireEvent.click(columns[2]);//player TWO
        fireEvent.click(columns[5]);//player ONE
        fireEvent.click(columns[6]);//player TWO
        const msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('Player TWO is the !!!Winner!!!');
    })

    it("Should announce Match Drawn", () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);//player ONE
        fireEvent.click(columns[1]);//player TWO
        fireEvent.click(columns[2]);//player ONE
        fireEvent.click(columns[3]);//player TWO
        fireEvent.click(columns[4]);//player ONE
        fireEvent.click(columns[5]);//player TWO
        fireEvent.click(columns[7]);//player ONE
        fireEvent.click(columns[6]);//player TWO
        fireEvent.click(columns[8]);//player ONE
        const msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('Match is Draw!!');
    })

    it('Should reset the board and message on Reset Button click', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const btnReset = screen.getByTestId('btn-reset');
        let msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('Player ONE turn now...');
        fireEvent.click(btnReset);
        msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('');
    });

    it('Should start with player ONE after reset', () => {
        render(<Board/>);
        const btnStart = screen.getByTestId('btn-start');
        fireEvent.click(btnStart);
        const columns = screen.getAllByTestId('column');
        fireEvent.click(columns[0]);
        fireEvent.click(columns[8]);
        const btnReset = screen.getByTestId('btn-reset');
        fireEvent.click(btnReset);
        fireEvent.click(btnStart);
        let msg = screen.getByRole('heading', {level: 2});
        expect(msg).toHaveTextContent('Player ONE turn now...');
    });

})