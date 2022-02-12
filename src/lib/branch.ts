import axios from "axios";
import { CONSTANTS } from "src/constants";

export const DEFAULT_BRANCH_LINK = "https://dharma.app.link/bnTHPgOf55";

interface Data {
  submittedStripeVerification: boolean;
}

class Branch {
  branchKey: string;
  baseUrl: string;

  constructor() {
    this.branchKey = CONSTANTS.BRANCH_KEY;
    this.baseUrl = "https://api2.branch.io";
  }

  /*
    Use retries in case Branch returns a timeout error which we have seen.
    */
  async createLink(data: Data) {
    const createLinkUrl = `${this.baseUrl}/v1/url`;
    const RETRY_MAX = 7;
    let retries = 0;

    while (retries <= RETRY_MAX) {
      try {
        const response = await axios.post<{ url: string }>(createLinkUrl, {
          branch_key: this.branchKey,
          data
        });

        return response.data.url;
      } catch (err) {
        retries += 1;
      }
    }

    return DEFAULT_BRANCH_LINK;
  }
}

export default new Branch();
