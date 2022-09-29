/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <nav>
          <ul>
            <li>
              <a
                href="https://www.pipelinepredators.com"
                target="_blank"
              >
                Pipeline Predators
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          &copy; {1900 + new Date().getYear()}, Designed by{" "}
          <a
            href="https://www.invisionapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pipeline Predators Admin Portal
          </a>
          . Coded by{" Pipeline predators team "}
          <a
            href="https://www.pipelinepredators.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pipeline Predators
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
