# Pair Programming Sessions

This repo consists of frontend programming interview questions from [GreatFrontend](https://www.greatfrontend.com/questions). All attempted solutions are completed with minimal assistance from AI, primarily for the purposes of spaced repetition and deliberate practice.

## Plain JS

| Feature | Requirement(s) | Takeaways |
| --- | --- | --- |
| Counter | Make the text within the button display the number of times the button has been clicked. | Did not use AI at all for this feature. Got reminded that `text-align: center` is used to center text or div horizontally. When in doubt, `console.log()`
| Accordion | Build an Accordion component that displays a list of vertically stacked sections that each contain a title and content snippet. By default, all sections are collapsed and are hidden from view. Clicking on a section title toggles the contents. If the section is collapsed, the section will be expanded and the contents will be displayed. If the section is expanded, the section will be collapsed and the contents will be hidden. The sections are independent of each other. | Did not use AI for this feature. The current approach is a bit repetitive because I define 3 separate functions for 3 sections using the same logic. This is not scalable because what if there are more than 3 sections (think a Q&A). I'm thinking one way I can improve this is to define only one function using an `if-else` logic such that if the button clicked is A, then change the content of A, but if the button is B, then change the content of B, etc.

## React