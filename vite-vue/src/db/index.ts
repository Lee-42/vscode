/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Dexie, { type EntityTable } from "dexie";
import type { ProjectProps } from "../types/index.ts";

export const db = new Dexie("miniProgramDatabase") as Dexie & {
  projects: EntityTable<ProjectProps, "id">;
};

db.version(1).stores({
  projects: "++id",
});

