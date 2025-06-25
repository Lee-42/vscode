/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export interface ProjectProps {
	id?: string;
	name?: string;
	projectPath?: string;
	device?: {
		value: string;
		label: string;
		screenWidth: number;
		screenHeight: number;
		winWidth: number;
		winHeight: number;
		padding: [number, number, number, number];
		statusHeight: number;
		borderRadius: string;
		frame: string;
	};
	scale?: number;
	createdAt?: Date;
	updatedAt?: Date;
	simulationVisible?: boolean;
	devtoolVisible?: boolean;
}
