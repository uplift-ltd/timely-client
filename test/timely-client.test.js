import TimelyClient from '../src'

describe('TimelyClient', () => {
  it('should blow up if no options', () => {
    try {
      const client = new TimelyClient()
      throw new Error('Should have blown up')
    } catch (err) {
      expect(err.message).toContain('accessToken')
    }
  })

  it('should initialize with an accessToken', () => {
    const client = new TimelyClient({
      accessToken: '<accessToken>',
    })
    expect(client).toBeInstanceOf(TimelyClient)
  })
})
