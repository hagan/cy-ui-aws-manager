export default function Home() {
  return (
    <div>
      <h2>AWS Manager</h2>
      <p>
        State: Only terminal access is supported. Please click terminal link to
        shell into service and test the following commands:
      </p>
      <ul>
        <li>flask setup-s3</li>
        <li>flask setup-vpc</li>
        <li>flask create-ec2</li>
        <li>...</li>
        <li>Work in progress</li>
      </ul>
    </div>
  );
}
