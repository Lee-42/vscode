/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';

export const ISimulatorService = createDecorator<ISimulatorService>(
	'simualtorService'
);

export interface ISimulatorService {
	readonly _serviceBrand: undefined;
}
