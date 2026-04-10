import { Stack } from 'expo-router';
import { Button, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

// CONTEXT AND STORE
import { useAuthStore } from '@/shared/context/authStore.context';

// TYPES
import { ILoginUserResponse, TGraphQLResponse } from '@/shared/types/types';

// UTILS
import { graphqlFetch } from '@/shared/utils/api.utils';

// GRAPHQL
import { LOGIN_USER } from '@/shared/graphql/mutations';
import { GET_ALL_CHAPTERS } from '@/shared/graphql/query';

const variables = {
	email: 'sam+2@mail.com',
	password: 'Test_2026',
};

export default function Index() {
	const [test, setTest] = useState('');

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

		await SecureStore.setItemAsync('accessToken', newAccessToken);
		await SecureStore.setItemAsync('refreshToken', newRefreshToken);
		useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
	};

	const getChapter = async () => {
		const response = await graphqlFetch(GET_ALL_CHAPTERS);
		setTest(JSON.stringify(response, null, 2));
	};

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
			{test ? <Text>{test}</Text> : null}
		</View>
	);
}
