import Link from "next/link";

const Resource = ({ children, link }) => {
  return (
    <div className="resource-container">
      <Link href={link}>
        <a>{children}</a>
      </Link>
      <style jsx>{`
        .resource-container {
          border: 2px solid #ebeef1;
          padding: 0 10px;
          margin-right: 7px;
          margin-bottom: 15px;
          border-radius: 4px;
          max-width: 30%;
          width: 25%;
          display: inline-block;
          vertical-align: top;
          box-shadow: 0 4px 3px -3px transparent;
        }
        .resource-container:hover {
          cursor: pointer;
          border: 2px solid rgb(99, 102, 241);
          box-shadow: 0 4px 3px -3px lightgrey;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default Resource;
