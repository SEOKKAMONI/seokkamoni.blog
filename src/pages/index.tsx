import React from "react";
import { Link, graphql } from "gatsby";

import MainLayout from "../components/MainLayout";
import { AllMarkdownRemark, SiteMetadata } from "../types/types";
import styled from "@emotion/styled";
import PostCard from "../components/PostCard";
import Bio from "../components/Bio";
import { getImage } from "gatsby-plugin-image";

type AllPostPageProps = {
  data: {
    site: { siteMetadata: SiteMetadata };
    allMarkdownRemark: AllMarkdownRemark;
  };
  location: Location;
};

const AllPostPage = ({ data }: AllPostPageProps) => {
  const siteTitle = data.site.siteMetadata?.title;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <MainLayout title={siteTitle}>
      <Bio />
      <StyledPostList>
        {posts.map(post => {
          const thumbnail = getImage(post.frontmatter.thumbnail);
          const title = post.frontmatter.title || post.fields.slug;
          const description = post.frontmatter.description || post.excerpt;
          const date = post.frontmatter.date;
          const slug = post.fields.slug;

          return (
            <PostCard
              key={slug}
              thumbnail={thumbnail}
              slug={slug}
              title={title}
              description={description}
              date={date}
            />
          );
        })}
      </StyledPostList>
    </MainLayout>
  );
};

export default AllPostPage;

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  padding: 40px 0;
`;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          title
          description
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
