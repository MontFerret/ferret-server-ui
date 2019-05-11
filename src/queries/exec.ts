import gql from 'graphql-tag';

export const findQuery = gql`
    query findExecutions($projectId: String!, $query: Query) {
        output(projectId: $projectId, query: $query)
            @rest(
                type: "[Execution]"
                path: "/projects/{args.projectId}/exec?{args.query}"
            ) {
            paging
            data
        }
    }
`;
