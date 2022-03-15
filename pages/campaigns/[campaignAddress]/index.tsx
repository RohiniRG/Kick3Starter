import React from "react";
import { NextRouter, useRouter } from 'next/router';
import Layout from "../../../components/layout";

const CampaignDetails: React.FC = () => {
    const router: NextRouter = useRouter();
    const { campaignAddress } = router.query;

    return (
        <Layout>
            <h1>Campaign Details</h1>
        </Layout>
    )
}

export default CampaignDetails;
