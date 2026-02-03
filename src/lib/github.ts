/**
 * GitHub Integration for Repository Access
 * Handles granting customers access to private boilerplate repositories
 */

import { Octokit } from '@octokit/rest';
import { logger } from '@/lib/logger';
import { env } from '@/lib/env';

let octokitInstance: Octokit | null = null;

/**
 * Initialize Octokit client with GitHub Personal Access Token
 * Token should have admin:repo_hook and repo scopes
 */
function getOctokit(): Octokit {
  if (!octokitInstance) {
    if (!env.server.GITHUB_ACCESS_TOKEN) {
      throw new Error('GITHUB_ACCESS_TOKEN environment variable not set');
    }

    octokitInstance = new Octokit({
      auth: env.server.GITHUB_ACCESS_TOKEN,
    });
  }

  return octokitInstance;
}

/**
 * Grant a GitHub user access to the Fabrk boilerplate repository
 * Creates them as a collaborator with read-only (pull) access
 */
export async function grantRepositoryAccess(
  githubUsername: string,
  permission: 'pull' | 'push' | 'admin' = 'pull'
): Promise<{
  success: boolean;
  message: string;
  repoUrl?: string;
  error?: string;
}> {
  try {
    // Validate GitHub username format (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9_-]+$/.test(githubUsername)) {
      return {
        success: false,
        message: 'Invalid GitHub username format',
        error:
          'GitHub username must contain only alphanumeric characters, hyphens, and underscores',
      };
    }

    logger.info('Granting repository access', {
      githubUsername,
      permission,
      repo: `${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`,
    });

    const octokit = getOctokit();

    // Verify the user exists on GitHub first
    try {
      await octokit.users.getByUsername({
        username: githubUsername,
      });
    } catch (error: unknown) {
      logger.error('GitHub user not found', {
        githubUsername,
        error,
      });
      return {
        success: false,
        message: 'GitHub user not found',
        error: `The GitHub username "${githubUsername}" does not exist. Please verify it's correct.`,
      };
    }

    // Add user as collaborator to the repository
    await octokit.repos.addCollaborator({
      owner: env.server.GITHUB_REPO_OWNER!,
      repo: env.server.GITHUB_REPO_NAME!,
      username: githubUsername,
      permission,
    });

    const repoUrl = `https://github.com/${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`;

    logger.info('Repository access granted successfully', {
      githubUsername,
      repo: `${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`,
      repoUrl,
    });

    return {
      success: true,
      message: `Access granted to ${repoUrl}`,
      repoUrl,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logger.error('Error granting repository access', {
      githubUsername,
      error: errorMessage,
    });

    // Check if it's a rate limit error
    if (errorMessage.includes('API rate limit')) {
      return {
        success: false,
        message: 'GitHub API rate limit exceeded',
        error: 'Please try again in a few minutes',
      };
    }

    // Check if user already has access
    if (errorMessage.includes('Validation Failed') || errorMessage.includes('already has access')) {
      const repoUrl = `https://github.com/${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`;
      return {
        success: true,
        message: 'User already has access to the repository',
        repoUrl,
      };
    }

    return {
      success: false,
      message: 'Failed to grant repository access',
      error: errorMessage,
    };
  }
}

/**
 * Revoke a GitHub user's access to the Fabrk boilerplate repository
 * Useful for refunds or license revocation
 */
export async function revokeRepositoryAccess(githubUsername: string): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    logger.info('Revoking repository access', {
      githubUsername,
      repo: `${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`,
    });

    const octokit = getOctokit();

    await octokit.repos.removeCollaborator({
      owner: env.server.GITHUB_REPO_OWNER!,
      repo: env.server.GITHUB_REPO_NAME!,
      username: githubUsername,
    });

    logger.info('Repository access revoked successfully', {
      githubUsername,
      repo: `${env.server.GITHUB_REPO_OWNER}/${env.server.GITHUB_REPO_NAME}`,
    });

    return {
      success: true,
      message: `Access revoked for ${githubUsername}`,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    logger.error('Error revoking repository access', {
      githubUsername,
      error: errorMessage,
    });

    return {
      success: false,
      message: 'Failed to revoke repository access',
      error: errorMessage,
    };
  }
}

/**
 * Check if a user has access to the repository
 */
export async function checkRepositoryAccess(githubUsername: string): Promise<boolean> {
  try {
    const octokit = getOctokit();

    await octokit.repos.getCollaboratorPermissionLevel({
      owner: env.server.GITHUB_REPO_OWNER!,
      repo: env.server.GITHUB_REPO_NAME!,
      username: githubUsername,
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * List all collaborators on the Fabrk boilerplate repository
 * Useful for auditing access
 */
export async function listRepositoryCollaborators(): Promise<
  Array<{
    username: string;
    permission: string;
    type: string;
  }>
> {
  try {
    const octokit = getOctokit();

    const collaborators = await octokit.repos.listCollaborators({
      owner: env.server.GITHUB_REPO_OWNER!,
      repo: env.server.GITHUB_REPO_NAME!,
    });

    return collaborators.data.map((collab) => ({
      username: collab.login,
      permission: collab.role_name || collab.permissions?.pull ? 'pull' : 'push',
      type: collab.type,
    }));
  } catch (error: unknown) {
    logger.error('Error listing repository collaborators', error);
    return [];
  }
}
