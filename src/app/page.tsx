import { Alert } from "@/components/bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Alert>
        <h2>This is a placeholder for the AWS Manger VICE application</h2>
        <h3>TODOs:</h3>
        <ul>
          <li>
            <s>Create a base Dockerfile for our VICE application</s>
          </li>
          <li>
            <s>
              Setup Flask application (compile to whl and install in Docker)
            </s>
          </li>
          <li>
            <s>
              Setup Nginx on port 80, gunicorn on socket. Route /api into Flask
              application
            </s>
          </li>
          <li>Setup NodeJS on socket. Route to / for our NextJS application</li>
          <li>
            Setup Pulumi and use KMS key to authorize actions on AWS. + API
            flask endpoint to stash key
          </li>
          <li>
            Add capture view on NextJS application to insert our KMS key into
            stack
          </li>
          <li>
            <s>Setup TTYd on /shell and hook into Nginx.</s>
          </li>
          <li>
            <s>
              Create a dummy Flask CLI command to setup the a basic S3 bucket
              using KMS key
            </s>
          </li>
          <li>
            <s>Lambda API that start/stops an EC2 instance</s>
          </li>
          <h4>Create CLI commands/Pulimi Flask that setup VPC</h4>
          <ul>
            <li>Flask CLI part</li>
            <li>Pulumi VPC setup/teardown function</li>
          </ul>
          <h4>Create EC2 Flask/Pulumi/CLI EC2 setup</h4>
          <ul>
            <li>List</li>
            <li>Create</li>
            <li>Delete</li>
            <li>Start</li>
            <li>Stop</li>
          </ul>
          <h4>Security Groups Flask/Pulumi/CLI for VPC/EC2 instance</h4>
          <ul>
            <li>List/Add/Remove</li>
            <li>Edit</li>
          </ul>
          <h4>User management Flask/Pulumi/CLI for EC2</h4>
          <ul>
            <li>List/Add/Remove</li>
            <li>Upload ssh pub key</li>
          </ul>
        </ul>
      </Alert>
      <Alert variant="secondary">
        <p>Notes: Project uses submodules to link sections together:</p>
        <ul>
          <li>
            Main project:{" "}
            <Link href="https://github.com/hagan/cy-aws-manager.git">
              cy-aws-manager
            </Link>
          </li>
          <ul>
            <li>
              API:{" "}
              <Link href="https://github.com/hagan/cy-flask-aws-manager.git">
                cy-flask-aws-manager
              </Link>
            </li>
            <li>
              Vice:{" "}
              <Link href="https://github.com/hagan/cy-vice-aws-manager.git">
                cy-vice-aws-manager
              </Link>
            </li>
            <li>
              UI:{" "}
              <Link href="https://github.com/hagan/cy-ui-aws-manager.git">
                cy-ui-aws-manager
              </Link>
            </li>
          </ul>
        </ul>
      </Alert>
    </div>
  );
}
