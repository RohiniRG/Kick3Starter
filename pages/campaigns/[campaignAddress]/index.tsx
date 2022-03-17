import React from "react";
import { NextRouter } from 'next/router'
import { useRouter } from 'next/router';
import Layout from "../../../components/layout";
import { Contract, ethers } from "ethers";
import Campaign from "../../../artifacts/contracts/campaign.sol/Campaign.json";
import web3Provider from "../../../scripts/web3_provider";
import { Grid, Message } from "semantic-ui-react";
import { ParsedUrlQuery } from "querystring";

interface StatelessPage<P = {}> extends React.FC<P> {
    getInitialProps?: (ctx: any) => Promise<P>
}
  
const CampaignDetails: StatelessPage = (props) => {
    const router: NextRouter = useRouter();
    const address: ParsedUrlQuery = router.query;
    console.log(`address: ${address}`); 

    CampaignDetails.getInitialProps = async (): Promise<any> => {
        const contract: Contract = new ethers.Contract(`${address.campaignAddress}`, Campaign.abi, web3Provider);
        const summary: any[] = await contract.getSummary();
        console.log(`summary: ${summary}`);
        return { summary }
    }
    
    return (
        <Layout>
            <Grid>
                <Grid.Column>
                    <Message size="massive">
                        Campaign Details: { address.campaignAddress }
                    </Message>
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

export default CampaignDetails;

// interface WithRouterProps {
//     router: NextRouter
// }
// interface MyComponentProps extends WithRouterProps {}

// class CampaignDetails extends Component<MyComponentProps> {
//     // const { campaignAddress } = this.props.router.query;
//     static async getInitialProps(props): Promise<any> {
//         // const router: NextRouter = useRouter();
//         // const { campaignAddress } = props.query.address;
//         console.log(`campaignAddress: ${props.query.address}`);
//         // const contract: Contract = new ethers.Contract(campaignAddress as string, Campaign.abi, web3Provider);
//         // const summary: any = await contract.getSummary();
//         // console.log(`summary: ${summary}`);
//         return { }
//     }

//     render(): JSX.Element {

//         return (
//             <Layout>
//                 <Grid>
//                     <Grid.Column>
//                         <Message size="massive">
//                             Campaign details page here
//                         </Message>
//                     </Grid.Column>
//                 </Grid>
//             </Layout >
//         )
//     }
// }

// export default withRouter(CampaignDetails);
