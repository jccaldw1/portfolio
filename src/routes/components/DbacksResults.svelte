<script lang="ts">
    let api_key = "a7bed7c9f0c169dbd916902217e294f4f8bfa9d978e59233ff5ca8c872246543";

    type TeamScore = {
        team: string,
        score: number
    }

    type DbacksGameResult = {
        // The datetime of the game in unix epoch
        date: number,
        winningTeamScore: TeamScore, losingTeamScore: TeamScore
    }

    // let dbacksResults: Promise<DbacksGameResult | void> = getDbacksResults();

    async function getDbacksResults() {
        try {
            let response = await fetch('api/DbacksResults/GET', {
                method: 'GET'
            });

            console.log('RESPONSE' + JSON.stringify(response) + 'FRESPONSE');

            return await response.json();
        } catch(e) {
            console.error('this is what happened: ' + e);
        }
    }
</script>

{#await getDbacksResults()}
    <p>...waiting</p>
{:then result}
    <p>The number is {result}</p>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}