import { Stack } from 'expo-router';
import { Button, Text, View } from 'react-native';


import { LOGIN_USER } from '@/shared/graphql/mutations';
import { useAuthStore } from '@/shared/context/authStore.context';
import { graphqlFetch } from '@/shared/utils/api.utils';
import { ILoginUserResponse, TGraphQLResponse } from '@/shared/types/types';
import { GET_ALL_CHAPTERS } from '@/shared/graphql/query';

const variables = {
	email: 'sam+2@mail.com',
	password: 'Test_2026',
};

export default function Index() {
	const handleOnPress = async () => {
		const data = await fetch('http://localhost:8080/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query: LOGIN_USER, variables }),
		});

		const response: TGraphQLResponse<ILoginUserResponse> = await data.json();

		const newAccessToken = response.data?.loginUser?.accessToken;
		const newRefreshToken = response.data?.loginUser?.refreshToken;

		if (!newAccessToken || !newRefreshToken)
			throw new Error('Failed to recieve new token');

		useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
	};

	const getChapter = async () => {
		const response = await graphqlFetch(GET_ALL_CHAPTERS);
		console.log(response);
	}


	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen options={{ headerShown: false }} />
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>Edit app/index.tsx to edit this screen.</Text>

				<Button title="login" onPress={handleOnPress} />
				<Button title="get chapters" onPress={getChapter} />
			</View>
		</View>
	);
}
