import mongoose from 'mongoose'
import { Roles } from 'src/constants/enum'
import AccountModel from 'src/models/account.model'
import MemberModel from 'src/models/member.model'
import RoleModel from 'src/models/role.model'
import UserModel from 'src/models/user.model'
import WorkspaceModel from 'src/models/workspace.model'
import { NotFoundException } from 'src/utils/appError'

export const loginOrCreateAccountService = async (data: {
  provider: string
  displayName: string
  providerId: string
  picture?: string
  email?: string
}) => {
  const { providerId, provider, displayName, email, picture } = data
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    console.log('Started Session...')

    let user = await UserModel.findOne({ email }).session(session)

    if (!user) {
      // Create a new user if it doesn't exist
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null
      })
      await user.save({ session })

      const account = new AccountModel({
        userId: user._id,
        provider: provider,
        providerId: providerId
      })
      await account.save({ session })

      // 3. Create a new workspace for the new user
      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        description: `Workspace created for ${user.name}`,
        owner: user._id
      })
      await workspace.save({ session })

      const ownerRole = await RoleModel.findOne({
        name: Roles.OWNER
      }).session(session)

      if (!ownerRole) {
        throw new NotFoundException('Owner role not found')
      }

      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date()
      })
      await member.save({ session })

      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId
      await user.save({ session })
    }
    await session.commitTransaction()
    session.endSession()
    console.log('End Session...')

    return { user }
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  } finally {
    session.endSession()
  }
}
