// Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com).

// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/http;
import ballerina/log;
import ballerinax/health.fhir.r4;

configurable string sourceEpHost = ?;
configurable map<string> serverComponentRoutes = {
    "Patient": "/fhir/r4/Patient",
    "metadata": "/fhir/r4/metadata",
    "well-known": "/fhir/r4/.well-known/smart-configuration"
};

final http:Client sourceEpClient = check new (sourceEpHost);

# A service representing a network-accessible API
# bound to port `9091`.
service / on new http:Listener(9091) {

    # Resource for proxying metadata endpoint. This resource will be unsecured endpoint.
    #
    # + req - HTTP Request
    # + return - Returns the response from metadata component.
    isolated resource function get fhir/r4/metadata(http:Request req) returns http:Response|http:StatusCodeResponse|error {

        string? metadataEp = serverComponentRoutes["metadata"];
        if metadataEp is string {
            if metadataEp.startsWith(sourceEpHost) {
                metadataEp = metadataEp.substring(sourceEpHost.length());
            }
            log:printInfo("Metadata endpoint: " + <string>metadataEp);
            http:Response|http:ClientError matadataResponse = sourceEpClient->forward(<string>metadataEp, req);
            return matadataResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: "Metadata endpoint not configured to route the request."
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }

    # Resource for proxying SMART well-known endpoint. This resource will be unsecured endpoint.
    #
    # + req - HTTP Request
    # + return - Returns the response from SMART well-known component.
    isolated resource function get fhir/r4/\.well\-known/smart\-configuration(http:Request req) returns http:Response|http:StatusCodeResponse|error {

        string? wellKnownEp = serverComponentRoutes["well-known"];
        if wellKnownEp is string {
            if wellKnownEp.startsWith(sourceEpHost) {
                wellKnownEp = wellKnownEp.substring(sourceEpHost.length());
            }
            http:Response|http:ClientError wellKnownEPResponse = sourceEpClient->forward(<string>wellKnownEp, req);
            return wellKnownEPResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: "SMART well-known endpoint not configured to route the request."
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }

    # Resource for proxying all read/search interactions of FHIR resources. 
    # This resource will be secured endpoint as all the FHIR resources needs to be secured.
    #
    # + paths - Path parameters 
    # + req - HTTP Request
    # + return - Returns the response from FHIR resource component.
    isolated resource function get fhir/r4/[string resourceType]/[string... paths](http:Request req) returns json|http:StatusCodeResponse|error {
        log:printInfo("Paths: " + paths.toString());
        log:printInfo("Resource Type: " + resourceType);
        log:printInfo(req.getHeaderNames().toJsonString());
        string[]|http:HeaderNotFoundError headers = req.getHeaders("x-jwt-assertion");
        if headers is string[] {
            log:printInfo("JWT: " + headers.toJsonString());
        }
        string? resourceEP = serverComponentRoutes[resourceType];
        string resourceCtx = "";
        if resourceEP is string {
            if resourceEP.startsWith(sourceEpHost) {
                resourceEP = resourceEP.substring(sourceEpHost.length());
            }
            if paths.length() > 0 {
                foreach int i in 0 ... paths.length() - 1 {
                    resourceCtx += string `/${paths[i]}`;
                }
            }
            resourceEP = string `${resourceEP ?: ""}${resourceCtx}`;
            log:printInfo("Full path: " + sourceEpHost + <string>resourceEP);
            json|http:ClientError fhirAPIResponse = sourceEpClient->forward(<string>resourceEP, req);
            return fhirAPIResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: string `FHIR resource type: ${resourceType} not configured to route the request.`
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }

    # FHIR instance level operations will proxy through this resource.
    #
    # + req - HTTP Request
    # + return - Returns the response from FHIR resource component.
    isolated resource function get fhir/r4/[string resourceType]/[string resourceId]/[string operation](http:Request req) returns json|http:StatusCodeResponse|error {
        log:printInfo("Resource Type: " + resourceType);
        log:printInfo("Operation: " + operation);
        log:printInfo(req.getHeaderNames().toJsonString());
        string? resourceEP = serverComponentRoutes[resourceType];
        string resourceCtx = string `/${resourceId}/${operation}`;
        if resourceEP is string {
            if resourceEP.startsWith(sourceEpHost) {
                resourceEP = resourceEP.substring(sourceEpHost.length());
            }
            resourceEP = string `${resourceEP ?: ""}${resourceCtx}`;
            log:printInfo("Full path: " + sourceEpHost + <string>resourceEP);
            json|http:ClientError fhirAPIResponse = sourceEpClient->forward(<string>resourceEP, req);
            return fhirAPIResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: string `FHIR resource type: ${resourceType} not configured to route the request.`
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }

    # Resource for proxying FHIR resources. This resource will be secured endpoint as all the FHIR resources needs to be secured.
    #
    # + paths - Path parameters 
    # + req - HTTP Request
    # + return - Returns the response from FHIR resource component.
    isolated resource function get fhir/r4/[string... paths](http:Request req) returns http:Response|http:StatusCodeResponse|error {
        log:printInfo("Paths Default: " + paths.toString());
        string resourceType = paths[0];
        string? resourceEP = serverComponentRoutes[resourceType];
        string resourceCtx = "";
        if resourceEP is string {
            if resourceEP.startsWith(sourceEpHost) {
                resourceEP = resourceEP.substring(sourceEpHost.length());
            }
            if paths.length() > 3 {
                foreach int i in 2 ... paths.length() - 1 {
                    resourceCtx += string `/${paths[i]}`;
                }
            }
            resourceEP = string `${resourceEP ?: ""}${resourceCtx}`;
            log:printInfo("Full path: " + sourceEpHost + <string>resourceEP);
            http:Response|http:ClientError fhirAPIResponse = sourceEpClient->forward(<string>resourceEP, req);
            return fhirAPIResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: string `FHIR resource type: ${resourceType} not configured to route the request.`
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }

    # Proxy for create resources. This will be secured endpoint as all the FHIR resources needs to be secured.
    # 
    # + paths - Path parameters 
    # + req - HTTP Request
    # + return - Returns the response from FHIR resource component.
    isolated resource function post fhir/r4/[string... paths](http:Request req) returns http:Response|http:StatusCodeResponse|error {
        log:printInfo("Paths Default: " + paths.toString());
        string resourceType = paths[0];
        string? resourceEP = serverComponentRoutes[resourceType];
        string resourceCtx = "";
        if resourceEP is string {
            if resourceEP.startsWith(sourceEpHost) {
                resourceEP = resourceEP.substring(sourceEpHost.length());
            }
            if paths.length() > 3 {
                foreach int i in 2 ... paths.length() - 1 {
                    resourceCtx += string `/${paths[i]}`;
                }
            }
            resourceEP = string `${resourceEP ?: ""}${resourceCtx}`;
            log:printInfo("Full path: " + sourceEpHost + <string>resourceEP);
            http:Response|http:ClientError fhirAPIResponse = sourceEpClient->forward(<string>resourceEP, req);
            return fhirAPIResponse;
        }
        r4:OperationOutcome opOutcome = {
            issue: [
                {
                    severity: r4:ERROR,
                    code: r4:PROCESSING,
                    diagnostics: string `FHIR resource type: ${resourceType} not configured to route the request.`
                }
            ]
        };
        http:InternalServerError internalError = {
            body: opOutcome
        };
        return internalError;
    }
}
