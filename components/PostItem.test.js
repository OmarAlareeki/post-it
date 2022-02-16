import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostItem from "./PostItem";

describe("PostItem", () => {
    const onSubmit= jest.fn();

    beforeEach(() =>{
        onSubmit.mockClear();
        render(<PostItem onSubmit={handleSubmit} />)
    })

    it("when terms and conditions are accepted the fields should be validated", ()=>{
        //todo
    })

    it('zipCode should be validated', ()=>{
        //todo
    })
  
});
