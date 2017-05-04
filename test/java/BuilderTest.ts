/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { only, skip, slow, suite, test, timeout } from "mocha-typescript";

import { expect } from "chai";

import * as builder from "../../java/Builder";

@suite class BuilderTest {

    @test public "build empty"() {
        const jb = new builder.ClassBuilder("com.foo", "Bar");
        const output = jb.content();
        expect(jb.path).to.equal("/com/foo/Bar.java");
        expect(output).to.contain("public class Bar");
    }

}
