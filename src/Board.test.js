import { screen, render } from "@testing-library/react";
import Board from "./Board";

describe('Should create the Tic Tac Toe Board Game', () => {
    it('should render the heading', () => {
        render(<Board />);
        const heading = screen.getByRole('heading', {level: 1})
        expect(heading).toHaveTextContent('Tic Tac Toe');
    })

})