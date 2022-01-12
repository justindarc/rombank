import { css } from 'lit';

export const styles = css`
.fa, .fab, .fad, .fal, .far, .fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.fa, .far, .fas {
  font-family: "Font Awesome 5 Free";
}

.fab, .far {
  font-weight: 400;
}

.fa-folder::before {
  content: "\\f07b";
}

.fa-file::before {
  content: "\\f15b";
}
`;
