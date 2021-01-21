import React from "react";
import { Overlay } from "../styled-components/Overlay";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { media } from "../styled-components/utils";

const ExtendedOverlay = styled(Overlay)`
  align-items: left;
  background-color: #fff;
  padding: 5vh 10vw;
  color: #666;
  ${media.phone`padding: 0 5vw;`};
`;

const TermsOfService = () => (
  <ExtendedOverlay>
    <Header style={{ fontSize: "2em", textAlign: "center" }}>
      TERMS OF SERVICE
    </Header>
    <p style={{ textAlign: "center" }}>Last updated January 18, 2021</p>

    <Header as="h1" style={{ textAlign: "center" }}>
      1. Terms
    </Header>

    <p>
      By accessing this Website, accessible from https://wasedatime.com, you are
      agreeing to be bound by these Website Terms and Conditions of Use and
      agree that you are responsible for the agreement with any applicable local
      laws. If you disagree with any of these terms, you are prohibited from
      accessing this site. The materials contained in this Website are protected
      by copyright and trade mark law.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      2. Use License
    </Header>

    <p>
      Permission is granted to temporarily download one copy of the materials on
      WasedaTime's Website for personal, non-commercial transitory viewing only.
      This is the grant of a license, not a transfer of title, and under this
      license you may not:
    </p>

    <ul>
      <li>modify or copy the materials;</li>
      <li>
        use the materials for any commercial purpose or for any public display;
      </li>
      <li>
        attempt to reverse engineer any software contained on WasedaTime's
        Website;
      </li>
      <li>
        remove any copyright or other proprietary notations from the materials;
        or
      </li>
      <li>
        transferring the materials to another person or "mirror" the materials
        on any other server.
      </li>
    </ul>

    <p>
      This will let WasedaTime to terminate upon violations of any of these
      restrictions. Upon termination, your viewing right will also be terminated
      and you should destroy any downloaded materials in your possession whether
      it is printed or electronic format. These Terms of Service has been
      created with the help of the{" "}
      <a href="https://www.termsofservicegenerator.net">
        Terms Of Service Generator
      </a>
      .
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      3. Disclaimer
    </Header>

    <p>
      All the materials on WasedaTime’s Website are provided "as is". WasedaTime
      makes no warranties, may it be expressed or implied, therefore negates all
      other warranties. Furthermore, WasedaTime does not make any
      representations concerning the accuracy or reliability of the use of the
      materials on its Website or otherwise relating to such materials or any
      sites linked to this Website.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      4. Limitations
    </Header>

    <p>
      WasedaTime or its suppliers will not be hold accountable for any damages
      that will arise with the use or inability to use the materials on
      WasedaTime’s Website, even if WasedaTime or an authorize representative of
      this Website has been notified, orally or written, of the possibility of
      such damage. Some jurisdiction does not allow limitations on implied
      warranties or limitations of liability for incidental damages, these
      limitations may not apply to you.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      5. Revisions and Errata
    </Header>

    <p>
      The materials appearing on WasedaTime’s Website may include technical,
      typographical, or photographic errors. WasedaTime will not promise that
      any of the materials in this Website are accurate, complete, or current.
      WasedaTime may change the materials contained on its Website at any time
      without notice. WasedaTime does not make any commitment to update the
      materials.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      6. Links
    </Header>

    <p>
      WasedaTime has not reviewed all of the sites linked to its Website and is
      not responsible for the contents of any such linked site. The presence of
      any link does not imply endorsement by WasedaTime of the site. The use of
      any linked website is at the user’s own risk.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      7. Site Terms of Use Modifications
    </Header>

    <p>
      WasedaTime may revise these Terms of Use for its Website at any time
      without prior notice. By using this Website, you are agreeing to be bound
      by the current version of these Terms and Conditions of Use.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      8. Your Privacy
    </Header>

    <p>
      Please read our <a href="/privacy-policy">Privacy Policy</a>.
    </p>

    <Header as="h1" style={{ textAlign: "center" }}>
      9. Governing Law
    </Header>

    <p>
      Any claim related to WasedaTime's Website shall be governed by the laws of
      Japan without regards to its conflict of law provisions.
    </p>
  </ExtendedOverlay>
);

export default TermsOfService;
