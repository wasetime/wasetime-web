import React from "react";
import styled from "styled-components";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";

interface Props {
  path: string;
}

const TermsOfService = (props: Props) => (
  <div className="p-6 md:py-24 md:px-60">
    <h2 className="text-center my-4">TERMS OF SERVICE</h2>
    <p className="text-center my-4">Last updated January 18, 2021</p>

    <h4 className="text-center my-4">1. Terms</h4>

    <p>
      By accessing this Website, accessible from https://wasedatime.com, you are
      agreeing to be bound by these Website Terms and Conditions of Use and
      agree that you are responsible for the agreement with any applicable local
      laws. If you disagree with any of these terms, you are prohibited from
      accessing this site. The materials contained in this Website are protected
      by copyright and trade mark law.
    </p>

    <h4 className="text-center my-4">2. Use License</h4>

    <p>
      Permission is granted to temporarily download one copy of the materials on
      WasedaTime's Website for personal, non-commercial transitory viewing only.
      This is the grant of a license, not a transfer of title, and under this
      license you may not:
    </p>

    <ul>
      <li>
        <p>・modify or copy the materials;</p>
      </li>
      <li>
        <p>
          ・use the materials for any commercial purpose or for any public
          display;
        </p>
      </li>
      <li>
        <p>
          ・attempt to reverse engineer any software contained on WasedaTime's
          Website;
        </p>
      </li>
      <li>
        <p>
          ・remove any copyright or other proprietary notations from the
          materials; or
        </p>
      </li>
      <li>
        <p>
          ・transferring the materials to another person or "mirror" the
          materials on any other server.
        </p>
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

    <h4 className="text-center my-4">3. Disclaimer</h4>

    <p>
      All the materials on WasedaTime’s Website are provided "as is". WasedaTime
      makes no warranties, may it be expressed or implied, therefore negates all
      other warranties. Furthermore, WasedaTime does not make any
      representations concerning the accuracy or reliability of the use of the
      materials on its Website or otherwise relating to such materials or any
      sites linked to this Website.
    </p>

    <h4 className="text-center my-4">4. Limitations</h4>

    <p>
      WasedaTime or its suppliers will not be hold accountable for any damages
      that will arise with the use or inability to use the materials on
      WasedaTime’s Website, even if WasedaTime or an authorize representative of
      this Website has been notified, orally or written, of the possibility of
      such damage. Some jurisdiction does not allow limitations on implied
      warranties or limitations of liability for incidental damages, these
      limitations may not apply to you.
    </p>

    <h4 className="text-center my-4">5. Revisions and Errata</h4>

    <p>
      The materials appearing on WasedaTime’s Website may include technical,
      typographical, or photographic errors. WasedaTime will not promise that
      any of the materials in this Website are accurate, complete, or current.
      WasedaTime may change the materials contained on its Website at any time
      without notice. WasedaTime does not make any commitment to update the
      materials.
    </p>

    <h4 className="text-center my-4">6. Links</h4>

    <p>
      WasedaTime has not reviewed all of the sites linked to its Website and is
      not responsible for the contents of any such linked site. The presence of
      any link does not imply endorsement by WasedaTime of the site. The use of
      any linked website is at the user’s own risk.
    </p>

    <h4 className="text-center my-4">7. Site Terms of Use Modifications</h4>

    <p>
      WasedaTime may revise these Terms of Use for its Website at any time
      without prior notice. By using this Website, you are agreeing to be bound
      by the current version of these Terms and Conditions of Use.
    </p>

    <h4 className="text-center my-4">8. Your Privacy</h4>

    <p>
      Please read our <a href="/privacy-policy">Privacy Policy</a>.
    </p>

    <h4 className="text-center my-4">9. Governing Law</h4>

    <p>
      Any claim related to WasedaTime's Website shall be governed by the laws of
      Japan without regards to its conflict of law provisions.
    </p>
  </div>
);

export default TermsOfService;
