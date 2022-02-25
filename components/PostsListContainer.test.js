// import { render, fireEvent, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import PostsListContainer from "./PostsListContainer";
// import { getAuth } from "firebase/auth";
// export const onAuthStateChanged = jest.fn();

// describe("PostsListContainer", () => {
//   test("Find the Add Post button exist in the document", () => {
//     getAuth.mockReturnValue({
//       currentUser: {
//         getIdToken: jest.fn().mockReturnValueOnce("abc"),
//       },
//     });
//     onAuthStateChanged.mockReturnValue([true, false]);
//     expect(onAuthStateChanged).toBeCalledWith("my auth");
//     expect(getByText("true,false")).toBeTruthy();

//     render(<PostsListContainer />);

//     expect(screen.getByText("Add Post")).toBeInTheDocument();

//     screen.debug();
//   });
// });
